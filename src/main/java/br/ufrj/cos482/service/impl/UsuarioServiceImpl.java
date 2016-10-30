package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.UsuarioService;
import br.ufrj.cos482.domain.Usuario;
import br.ufrj.cos482.repository.UsuarioRepository;
import br.ufrj.cos482.service.dto.UsuarioDTO;
import br.ufrj.cos482.service.mapper.UsuarioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Usuario.
 */
@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService{

    private final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);
    
    @Inject
    private UsuarioRepository usuarioRepository;

    @Inject
    private UsuarioMapper usuarioMapper;

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        log.debug("Request to save Usuario : {}", usuarioDTO);
        Usuario usuario = usuarioMapper.usuarioDTOToUsuario(usuarioDTO);
        usuario = usuarioRepository.save(usuario);
        UsuarioDTO result = usuarioMapper.usuarioToUsuarioDTO(usuario);
        return result;
    }

    /**
     *  Get all the usuarios.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<UsuarioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Usuarios");
        Page<Usuario> result = usuarioRepository.findAll(pageable);
        return result.map(usuario -> usuarioMapper.usuarioToUsuarioDTO(usuario));
    }

    /**
     *  Get one usuario by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public UsuarioDTO findOne(Long id) {
        log.debug("Request to get Usuario : {}", id);
        Usuario usuario = usuarioRepository.findOne(id);
        UsuarioDTO usuarioDTO = usuarioMapper.usuarioToUsuarioDTO(usuario);
        return usuarioDTO;
    }

    /**
     *  Delete the  usuario by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Usuario : {}", id);
        usuarioRepository.delete(id);
    }
}
