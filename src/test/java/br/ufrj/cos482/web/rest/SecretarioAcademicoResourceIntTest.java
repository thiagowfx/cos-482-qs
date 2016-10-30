package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.SecretarioAcademico;
import br.ufrj.cos482.repository.SecretarioAcademicoRepository;
import br.ufrj.cos482.service.SecretarioAcademicoService;
import br.ufrj.cos482.service.dto.SecretarioAcademicoDTO;
import br.ufrj.cos482.service.mapper.SecretarioAcademicoMapper;

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
 * Test class for the SecretarioAcademicoResource REST controller.
 *
 * @see SecretarioAcademicoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class SecretarioAcademicoResourceIntTest {


    @Inject
    private SecretarioAcademicoRepository secretarioAcademicoRepository;

    @Inject
    private SecretarioAcademicoMapper secretarioAcademicoMapper;

    @Inject
    private SecretarioAcademicoService secretarioAcademicoService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSecretarioAcademicoMockMvc;

    private SecretarioAcademico secretarioAcademico;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SecretarioAcademicoResource secretarioAcademicoResource = new SecretarioAcademicoResource();
        ReflectionTestUtils.setField(secretarioAcademicoResource, "secretarioAcademicoService", secretarioAcademicoService);
        this.restSecretarioAcademicoMockMvc = MockMvcBuilders.standaloneSetup(secretarioAcademicoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SecretarioAcademico createEntity(EntityManager em) {
        SecretarioAcademico secretarioAcademico = new SecretarioAcademico();
        return secretarioAcademico;
    }

    @Before
    public void initTest() {
        secretarioAcademico = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecretarioAcademico() throws Exception {
        int databaseSizeBeforeCreate = secretarioAcademicoRepository.findAll().size();

        // Create the SecretarioAcademico
        SecretarioAcademicoDTO secretarioAcademicoDTO = secretarioAcademicoMapper.secretarioAcademicoToSecretarioAcademicoDTO(secretarioAcademico);

        restSecretarioAcademicoMockMvc.perform(post("/api/secretario-academicos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(secretarioAcademicoDTO)))
                .andExpect(status().isCreated());

        // Validate the SecretarioAcademico in the database
        List<SecretarioAcademico> secretarioAcademicos = secretarioAcademicoRepository.findAll();
        assertThat(secretarioAcademicos).hasSize(databaseSizeBeforeCreate + 1);
        SecretarioAcademico testSecretarioAcademico = secretarioAcademicos.get(secretarioAcademicos.size() - 1);
    }

    @Test
    @Transactional
    public void getAllSecretarioAcademicos() throws Exception {
        // Initialize the database
        secretarioAcademicoRepository.saveAndFlush(secretarioAcademico);

        // Get all the secretarioAcademicos
        restSecretarioAcademicoMockMvc.perform(get("/api/secretario-academicos?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(secretarioAcademico.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSecretarioAcademico() throws Exception {
        // Initialize the database
        secretarioAcademicoRepository.saveAndFlush(secretarioAcademico);

        // Get the secretarioAcademico
        restSecretarioAcademicoMockMvc.perform(get("/api/secretario-academicos/{id}", secretarioAcademico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(secretarioAcademico.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSecretarioAcademico() throws Exception {
        // Get the secretarioAcademico
        restSecretarioAcademicoMockMvc.perform(get("/api/secretario-academicos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecretarioAcademico() throws Exception {
        // Initialize the database
        secretarioAcademicoRepository.saveAndFlush(secretarioAcademico);
        int databaseSizeBeforeUpdate = secretarioAcademicoRepository.findAll().size();

        // Update the secretarioAcademico
        SecretarioAcademico updatedSecretarioAcademico = secretarioAcademicoRepository.findOne(secretarioAcademico.getId());
        SecretarioAcademicoDTO secretarioAcademicoDTO = secretarioAcademicoMapper.secretarioAcademicoToSecretarioAcademicoDTO(updatedSecretarioAcademico);

        restSecretarioAcademicoMockMvc.perform(put("/api/secretario-academicos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(secretarioAcademicoDTO)))
                .andExpect(status().isOk());

        // Validate the SecretarioAcademico in the database
        List<SecretarioAcademico> secretarioAcademicos = secretarioAcademicoRepository.findAll();
        assertThat(secretarioAcademicos).hasSize(databaseSizeBeforeUpdate);
        SecretarioAcademico testSecretarioAcademico = secretarioAcademicos.get(secretarioAcademicos.size() - 1);
    }

    @Test
    @Transactional
    public void deleteSecretarioAcademico() throws Exception {
        // Initialize the database
        secretarioAcademicoRepository.saveAndFlush(secretarioAcademico);
        int databaseSizeBeforeDelete = secretarioAcademicoRepository.findAll().size();

        // Get the secretarioAcademico
        restSecretarioAcademicoMockMvc.perform(delete("/api/secretario-academicos/{id}", secretarioAcademico.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<SecretarioAcademico> secretarioAcademicos = secretarioAcademicoRepository.findAll();
        assertThat(secretarioAcademicos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
