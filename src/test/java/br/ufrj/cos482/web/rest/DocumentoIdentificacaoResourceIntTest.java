package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.DocumentoIdentificacao;
import br.ufrj.cos482.repository.DocumentoIdentificacaoRepository;
import br.ufrj.cos482.service.DocumentoIdentificacaoService;
import br.ufrj.cos482.service.dto.DocumentoIdentificacaoDTO;
import br.ufrj.cos482.service.mapper.DocumentoIdentificacaoMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DocumentoIdentificacaoResource REST controller.
 *
 * @see DocumentoIdentificacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class DocumentoIdentificacaoResourceIntTest {

    private static final String DEFAULT_TIPO = "AAAAA";
    private static final String UPDATED_TIPO = "BBBBB";
    private static final String DEFAULT_VALOR = "AAAAA";
    private static final String UPDATED_VALOR = "BBBBB";

    @Inject
    private DocumentoIdentificacaoRepository documentoIdentificacaoRepository;

    @Inject
    private DocumentoIdentificacaoMapper documentoIdentificacaoMapper;

    @Inject
    private DocumentoIdentificacaoService documentoIdentificacaoService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restDocumentoIdentificacaoMockMvc;

    private DocumentoIdentificacao documentoIdentificacao;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DocumentoIdentificacaoResource documentoIdentificacaoResource = new DocumentoIdentificacaoResource();
        ReflectionTestUtils.setField(documentoIdentificacaoResource, "documentoIdentificacaoService", documentoIdentificacaoService);
        this.restDocumentoIdentificacaoMockMvc = MockMvcBuilders.standaloneSetup(documentoIdentificacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentoIdentificacao createEntity(EntityManager em) {
        DocumentoIdentificacao documentoIdentificacao = new DocumentoIdentificacao()
                .tipo(DEFAULT_TIPO)
                .valor(DEFAULT_VALOR);
        return documentoIdentificacao;
    }

    @Before
    public void initTest() {
        documentoIdentificacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentoIdentificacao() throws Exception {
        int databaseSizeBeforeCreate = documentoIdentificacaoRepository.findAll().size();

        // Create the DocumentoIdentificacao
        DocumentoIdentificacaoDTO documentoIdentificacaoDTO = documentoIdentificacaoMapper.documentoIdentificacaoToDocumentoIdentificacaoDTO(documentoIdentificacao);

        restDocumentoIdentificacaoMockMvc.perform(post("/api/documento-identificacaos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(documentoIdentificacaoDTO)))
                .andExpect(status().isCreated());

        // Validate the DocumentoIdentificacao in the database
        List<DocumentoIdentificacao> documentoIdentificacaos = documentoIdentificacaoRepository.findAll();
        assertThat(documentoIdentificacaos).hasSize(databaseSizeBeforeCreate + 1);
        DocumentoIdentificacao testDocumentoIdentificacao = documentoIdentificacaos.get(documentoIdentificacaos.size() - 1);
        assertThat(testDocumentoIdentificacao.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testDocumentoIdentificacao.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void getAllDocumentoIdentificacaos() throws Exception {
        // Initialize the database
        documentoIdentificacaoRepository.saveAndFlush(documentoIdentificacao);

        // Get all the documentoIdentificacaos
        restDocumentoIdentificacaoMockMvc.perform(get("/api/documento-identificacaos?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(documentoIdentificacao.getId().intValue())))
                .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
                .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.toString())));
    }

    @Test
    @Transactional
    public void getDocumentoIdentificacao() throws Exception {
        // Initialize the database
        documentoIdentificacaoRepository.saveAndFlush(documentoIdentificacao);

        // Get the documentoIdentificacao
        restDocumentoIdentificacaoMockMvc.perform(get("/api/documento-identificacaos/{id}", documentoIdentificacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentoIdentificacao.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentoIdentificacao() throws Exception {
        // Get the documentoIdentificacao
        restDocumentoIdentificacaoMockMvc.perform(get("/api/documento-identificacaos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentoIdentificacao() throws Exception {
        // Initialize the database
        documentoIdentificacaoRepository.saveAndFlush(documentoIdentificacao);
        int databaseSizeBeforeUpdate = documentoIdentificacaoRepository.findAll().size();

        // Update the documentoIdentificacao
        DocumentoIdentificacao updatedDocumentoIdentificacao = documentoIdentificacaoRepository.findOne(documentoIdentificacao.getId());
        updatedDocumentoIdentificacao
                .tipo(UPDATED_TIPO)
                .valor(UPDATED_VALOR);
        DocumentoIdentificacaoDTO documentoIdentificacaoDTO = documentoIdentificacaoMapper.documentoIdentificacaoToDocumentoIdentificacaoDTO(updatedDocumentoIdentificacao);

        restDocumentoIdentificacaoMockMvc.perform(put("/api/documento-identificacaos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(documentoIdentificacaoDTO)))
                .andExpect(status().isOk());

        // Validate the DocumentoIdentificacao in the database
        List<DocumentoIdentificacao> documentoIdentificacaos = documentoIdentificacaoRepository.findAll();
        assertThat(documentoIdentificacaos).hasSize(databaseSizeBeforeUpdate);
        DocumentoIdentificacao testDocumentoIdentificacao = documentoIdentificacaos.get(documentoIdentificacaos.size() - 1);
        assertThat(testDocumentoIdentificacao.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testDocumentoIdentificacao.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void deleteDocumentoIdentificacao() throws Exception {
        // Initialize the database
        documentoIdentificacaoRepository.saveAndFlush(documentoIdentificacao);
        int databaseSizeBeforeDelete = documentoIdentificacaoRepository.findAll().size();

        // Get the documentoIdentificacao
        restDocumentoIdentificacaoMockMvc.perform(delete("/api/documento-identificacaos/{id}", documentoIdentificacao.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentoIdentificacao> documentoIdentificacaos = documentoIdentificacaoRepository.findAll();
        assertThat(documentoIdentificacaos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
