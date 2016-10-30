package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.AlunoDoutorado;
import br.ufrj.cos482.repository.AlunoDoutoradoRepository;
import br.ufrj.cos482.service.AlunoDoutoradoService;
import br.ufrj.cos482.service.dto.AlunoDoutoradoDTO;
import br.ufrj.cos482.service.mapper.AlunoDoutoradoMapper;

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
 * Test class for the AlunoDoutoradoResource REST controller.
 *
 * @see AlunoDoutoradoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class AlunoDoutoradoResourceIntTest {


    @Inject
    private AlunoDoutoradoRepository alunoDoutoradoRepository;

    @Inject
    private AlunoDoutoradoMapper alunoDoutoradoMapper;

    @Inject
    private AlunoDoutoradoService alunoDoutoradoService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restAlunoDoutoradoMockMvc;

    private AlunoDoutorado alunoDoutorado;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AlunoDoutoradoResource alunoDoutoradoResource = new AlunoDoutoradoResource();
        ReflectionTestUtils.setField(alunoDoutoradoResource, "alunoDoutoradoService", alunoDoutoradoService);
        this.restAlunoDoutoradoMockMvc = MockMvcBuilders.standaloneSetup(alunoDoutoradoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlunoDoutorado createEntity(EntityManager em) {
        AlunoDoutorado alunoDoutorado = new AlunoDoutorado();
        return alunoDoutorado;
    }

    @Before
    public void initTest() {
        alunoDoutorado = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlunoDoutorado() throws Exception {
        int databaseSizeBeforeCreate = alunoDoutoradoRepository.findAll().size();

        // Create the AlunoDoutorado
        AlunoDoutoradoDTO alunoDoutoradoDTO = alunoDoutoradoMapper.alunoDoutoradoToAlunoDoutoradoDTO(alunoDoutorado);

        restAlunoDoutoradoMockMvc.perform(post("/api/aluno-doutorados")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoDoutoradoDTO)))
                .andExpect(status().isCreated());

        // Validate the AlunoDoutorado in the database
        List<AlunoDoutorado> alunoDoutorados = alunoDoutoradoRepository.findAll();
        assertThat(alunoDoutorados).hasSize(databaseSizeBeforeCreate + 1);
        AlunoDoutorado testAlunoDoutorado = alunoDoutorados.get(alunoDoutorados.size() - 1);
    }

    @Test
    @Transactional
    public void getAllAlunoDoutorados() throws Exception {
        // Initialize the database
        alunoDoutoradoRepository.saveAndFlush(alunoDoutorado);

        // Get all the alunoDoutorados
        restAlunoDoutoradoMockMvc.perform(get("/api/aluno-doutorados?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(alunoDoutorado.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAlunoDoutorado() throws Exception {
        // Initialize the database
        alunoDoutoradoRepository.saveAndFlush(alunoDoutorado);

        // Get the alunoDoutorado
        restAlunoDoutoradoMockMvc.perform(get("/api/aluno-doutorados/{id}", alunoDoutorado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alunoDoutorado.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAlunoDoutorado() throws Exception {
        // Get the alunoDoutorado
        restAlunoDoutoradoMockMvc.perform(get("/api/aluno-doutorados/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlunoDoutorado() throws Exception {
        // Initialize the database
        alunoDoutoradoRepository.saveAndFlush(alunoDoutorado);
        int databaseSizeBeforeUpdate = alunoDoutoradoRepository.findAll().size();

        // Update the alunoDoutorado
        AlunoDoutorado updatedAlunoDoutorado = alunoDoutoradoRepository.findOne(alunoDoutorado.getId());
        AlunoDoutoradoDTO alunoDoutoradoDTO = alunoDoutoradoMapper.alunoDoutoradoToAlunoDoutoradoDTO(updatedAlunoDoutorado);

        restAlunoDoutoradoMockMvc.perform(put("/api/aluno-doutorados")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoDoutoradoDTO)))
                .andExpect(status().isOk());

        // Validate the AlunoDoutorado in the database
        List<AlunoDoutorado> alunoDoutorados = alunoDoutoradoRepository.findAll();
        assertThat(alunoDoutorados).hasSize(databaseSizeBeforeUpdate);
        AlunoDoutorado testAlunoDoutorado = alunoDoutorados.get(alunoDoutorados.size() - 1);
    }

    @Test
    @Transactional
    public void deleteAlunoDoutorado() throws Exception {
        // Initialize the database
        alunoDoutoradoRepository.saveAndFlush(alunoDoutorado);
        int databaseSizeBeforeDelete = alunoDoutoradoRepository.findAll().size();

        // Get the alunoDoutorado
        restAlunoDoutoradoMockMvc.perform(delete("/api/aluno-doutorados/{id}", alunoDoutorado.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<AlunoDoutorado> alunoDoutorados = alunoDoutoradoRepository.findAll();
        assertThat(alunoDoutorados).hasSize(databaseSizeBeforeDelete - 1);
    }
}
